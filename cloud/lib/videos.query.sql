SELECT 
    v.*,
    c.name as channel_name,
    c.avatar as channel_avatar
FROM videos v
INNER JOIN channels c ON v.channel_id = c.id
ORDER BY v.published_at ASC
LIMIT 24 OFFSET 0;