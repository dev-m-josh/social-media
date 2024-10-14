--ROAD MAP TO SOCIAL MEDIA DATABASE

--users
    --userId
    --userName
    --userEmail
    --password

--posts
    --postId
    --userId
    --content

--comments
    --commentId
    --postId
    --userId
    --content
    --createdAt

--comment replies
    --replyId
    --commentId
    --userId
    --content
    --createdAt

--creat database
CREATE DATABASE social_media;

--creat users table
CREATE TABLE users (
    user_id INT PRIMARY KEY IDENTITY(1,1),
    user_name VARCHAR(50) UNIQUE NOT NULL,
    profile_picture VARCHAR(255),
    user_email VARCHAR(50) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

--insert users
INSERT INTO users(user_name, profile_picture, user_email, user_password)
VALUES('johndoe', 'john_doe.jpg', 'johndoe1990@gmail.com', 'Password123!'),
        ('janesmith', 'jane_smith.jpg', 'jane.smith88@gmail.com', 'SecurePass456!'),
        ('mikebrown', 'mike_brown.jpg', 'mike.brown23@gmail.com', 'MyPassword789'),
        ('emilyjones', 'emily_jones.jpg', 'emily.jones91@gmail.com', 'StrongPass321'),
        ('sarahwhite', 'sarah_white.jpg', 'sarahwhite22@gmail.com', 'Password2024')


drop table users
SELECT* FROM users

--creat posts table
CREATE TABLE posts(
    post_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    post_content VARCHAR(255) NOT NULL
);

--creat posts
INSERT INTO posts(user_id, post_content)
VALUES(2, 'In the words of Maya Angelou, Nothing will work unless you do. Let’s get to work! 💪'),
        (1, 'Follow us, like this post, and tag a friend for a chance to win a free product!'),
        (3, 'Check out our latest video on how to use our product for maximum effect!'),
        (2, 'I told my boss I needed a raise. He said I need to work on my presentation skills. I told him I wasn’t asking for a presentation')

drop table posts
SELECT* FROM posts

--creat comments table
CREATE TABLE comments(
    comment_id INT PRIMARY key IDENTITY(1,1),
    post_id INT NOT NULL FOREIGN KEY REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id INT NOT NULL FOREIGN KEY REFERENCES users(user_id),
    comment_content VARCHAR(255) NOT NULL,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP
);

--insert comments
INSERT INTO comments(post_id, user_id, comment_content)
VALUES(4, 1, 'Sounds like your boss needs a lesson in communication!'),
        (4, 5, 'Maybe you should present your paycheck next time'),
        (1, 1, 'Love this quote! Motivation on point!'),
        (4, 3, 'Looks like you need to give your boss a little presentation of your own!'),
        (1, 5, 'Perfect reminder to stay focused and committed'),
        (3, 4, 'Just what I needed! Excited to learn some new techniques!')

drop TABLE comments
SELECT* FROM comments

--create comment replies table
CREATE TABLE comment_replies (
    reply_id INT PRIMARY KEY IDENTITY(1,1),
    comment_id INT NOT NULL FOREIGN KEY REFERENCES comments(comment_id) ON DELETE CASCADE,
    user_id INT NOT NULL FOREIGN KEY REFERENCES users(user_id), 
    replies_content VARCHAR(255) NOT NULL ,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

--reply comments
INSERT INTO comment_replies(comment_id, user_id, replies_content)
VALUES(2, 1, 'kumbavu zangu... umbwa mimi'),
        (3, 2, 'Thanks')

drop TABLE comment_replies

SELECT* FROM comment_replies