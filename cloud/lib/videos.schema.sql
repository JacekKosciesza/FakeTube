CREATE TABLE videos (
    id VARCHAR(11) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,    
    thumbnail VARCHAR(500) NOT NULL,
    duration VARCHAR(20) NOT NULL,
    url VARCHAR(500) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE NOT NULL,    
    channel_id VARCHAR(30) NOT NULL,

    CONSTRAINT fk_videos_channel_id 
        FOREIGN KEY (channel_id) 
        REFERENCES channels(id) 
        ON DELETE CASCADE
);