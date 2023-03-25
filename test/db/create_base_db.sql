CREATE TABLE IF NOT EXISTS requester_ips(
    ip varchar(64) PRIMARY KEY,
    method varchar(10),
    url varchar(255)
);