SELECT name FROM characters c JOIN rpgs r ON c.games = r.gname WHERE games = $1;
