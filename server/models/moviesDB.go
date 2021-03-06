package models

import (
	"context"
	"fmt"
	"time"
)

func (m *DBModel) Get(id int) (*Movie, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `select id, title, description, year, release_date, runtime, rating, 
							mpaa_rating, created_at, updated_at from movies where id = $1`

	row := m.DB.QueryRowContext(ctx, query, id)

	var movie Movie

	err := row.Scan(
		&movie.ID,
		&movie.Title,
		&movie.Description,
		&movie.Year,
		&movie.ReleaseDate,
		&movie.Runtime,
		&movie.Rating,
		&movie.MPAARating,
		&movie.CreatedAt,
		&movie.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	query = `select
						mg.id, mg.movie_id, mg.genre_id, g.genre_name
					from
						movies_genres mg
						left join genres g on (g.id = mg.genre_id)
					where
						mg.movie_id = $1
	`
	rows, _ := m.DB.QueryContext(ctx, query, id)
	defer rows.Close()

	genres := make(map[int]string)

	for rows.Next() {
		var mg MovieGenre
		err := rows.Scan(
			&mg.ID,
			&mg.MovieID,
			&mg.GenreID,
			&mg.Genre.GenreName,
		)
		if err != nil {
			return nil, err
		}

		genres[mg.ID] = mg.Genre.GenreName
	}

	movie.MovieGenre = genres

	return &movie, nil
}

func (m *DBModel) All(genre ...int) ([]*Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	where := ""
	if len(genre) > 0 {
		where = fmt.Sprintf("where id in (select movie_id from movies_genres where genre_id = %d)", genre[0])
	}

	query := fmt.Sprintf(`select id, title, description, year, release_date, runtime, rating, 
							mpaa_rating, created_at, updated_at from movies %s order by title`, where)

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var movies []*Movie

	for rows.Next() {
		var movie Movie
		err := rows.Scan(
			&movie.ID,
			&movie.Title,
			&movie.Description,
			&movie.Year,
			&movie.ReleaseDate,
			&movie.Runtime,
			&movie.Rating,
			&movie.MPAARating,
			&movie.CreatedAt,
			&movie.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		genreQuery := `select
							mg.id, mg.movie_id, mg.genre_id, g.genre_name
						from
							movies_genres mg
							left join genres g on (g.id = mg.genre_id)
						where
							mg.movie_id = $1
						`
		genreRows, _ := m.DB.QueryContext(ctx, genreQuery, movie.ID)

		genres := make(map[int]string)

		for genreRows.Next() {
			var mg MovieGenre
			err := genreRows.Scan(
				&mg.ID,
				&mg.MovieID,
				&mg.GenreID,
				&mg.Genre.GenreName,
			)
			if err != nil {
				return nil, err
			}

			genres[mg.ID] = mg.Genre.GenreName
		}
		genreRows.Close()

		movie.MovieGenre = genres
		movies = append(movies, &movie)
	}

	return movies, nil
}
