create TABLE person (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) not null unique,
    password VARCHAR(255) not null,
    role VARCHAR(255) DEFAULT 'USER'
);

create TABLE basket (
    id SERIAL PRIMARY KEY,
    person_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES person (id),
    picture_id INTEGER,
    FOREIGN KEY (picture_id) REFERENCES picture (id),
    quantity INTEGER
); 


create TABLE picture (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) ,
    price INTEGER,
    img VARCHAR(255),
    description TEXT,
    category VARCHAR(255)
);

