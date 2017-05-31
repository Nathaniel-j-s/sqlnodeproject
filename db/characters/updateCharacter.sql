UPDATE characters
SET name = COALESCE ($2, name), games = COALESCE ($3, games), classes = COALESCE ($4, classes)
WHERE charid = $1;
