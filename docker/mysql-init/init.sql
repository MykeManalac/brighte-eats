
CREATE DATABASE IF NOT EXISTS brightedatabase;

CREATE DATABASE IF NOT EXISTS brightedatabase_shadow;

CREATE USER IF NOT EXISTS 'brighteuser'@'%' IDENTIFIED BY 'brighte1234';

GRANT ALL PRIVILEGES ON brightedatabase.* TO 'brighteuser'@'%';

GRANT ALL PRIVILEGES ON brightedatabase_shadow.* TO 'brighteuser'@'%';

FLUSH PRIVILEGES;
