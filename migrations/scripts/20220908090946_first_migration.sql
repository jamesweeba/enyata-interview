--
--    Copyright 2010-2016 the original author or authors.
--
--    Licensed under the Apache License, Version 2.0 (the "License");
--    you may not use this file except in compliance with the License.
--    You may obtain a copy of the License at
--
--       http://www.apache.org/licenses/LICENSE-2.0
--
--    Unless required by applicable law or agreed to in writing, software
--    distributed under the License is distributed on an "AS IS" BASIS,
--    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
--    See the License for the specific language governing permissions and
--    limitations under the License.
--

-- // First migration.
-- Migration SQL that makes the change goes here.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE incidents(
id UUID PRIMARY KEY  NOT NULL UNIQUE DEFAULT uuid_generate_v1(),	
client_id INT NOT NULL,
incident_desc varchar not null,
city varchar not null,
country varchar not null,
weather_report jsonb not null,
date DATE NOT NULL DEFAULT CURRENT_DATE

);
CREATE INDEX idx_client_id
ON incidents (client_id);
CREATE INDEX idx_incident_desc
ON incidents (incident_desc);
CREATE INDEX idx_city
ON incidents (city);
CREATE INDEX idx_country
ON incidents (country);

-- //@UNDO
-- SQL to undo the change goes here.
DROP TABLE incidents;

