# CalCentral Team B

## Objective

## Dependencies

* Administrator privileges
* [Bundler](http://gembundler.com/rails3.html)
* [Git](https://help.github.com/articles/set-up-git)
* [JDBC Oracle driver](http://www.oracle.com/technetwork/database/enterprise-edition/jdbc-112010-090769.html)
* [Java 8 SDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [JRuby 9.1.14.0](http://jruby.org/)
* [Node.js >=8.9.4](http://nodejs.org/)
* [PostgreSQL](http://www.postgresql.org/)
* [Rubygems 2.5.1](https://rubygems.org/pages/download)
* [RVM](https://rvm.io/rvm/install/) - Ruby version managers
* [xvfb](http://xquartz.macosforge.org/landing/) - xvfb headless browser, included for Macs with XQuartz

## Installation

For detailed installation process, please refer to the step 1-15 from the CalCentral repo [here](https://github.com/sis-berkeley-edu/calcentral)

## Usage

1. To toggle the fake data injection function, please change the fake flag in `edodb` section of the `config/settings.yml` file to `true`, e.g.:

  ```yml
  edodb:
  fake: true
  ```
  **Note**: to disable the database stubbing feature, simply revert the fake flag to `false`

2. To insert new fake responses, open `config/initializer/populate_sisedo_h2.rb` and edit the insert clauses immediately after `CREATE TABLE SISEDO.STUBBED_RESPONSE`, e.g:
  ```SQL
    DROP TABLE IF EXISTS SISEDO.STUBBED_RESPONSES;
    CREATE TABLE SISEDO.STUBBED_RESPONSES (
      QID                       NUMBER,
      RESPONSE                  VARCHAR(4000)
    );
    INSERT INTO SISEDO.STUBBED_RESPONSES(QID, RESPONSE) VALUES (1, '{"UC_SRCH_CRIT": "Marshall Cremin","STUDENT_ID": "55474201384","CAMPUS_ID": "409668667284169326577928265309","OPRID": "477698031245345903800693789297","LAST_NAME": "Cremin","FIRST_NAME": "Marshall","MIDDLE_NAME": "Kub","UC_PRF_FIRST_NM": "Marshall","UC_PRF_MIDDLE_NM": "Kub","EMAIL_ADDR": "marshallcremin@berkeley.edu","ACAD_PROG": "Doctorate"}');
    INSERT INTO SISEDO.STUBBED_RESPONSES(QID, RESPONSE) VALUES ([your query_id], [your fake response])
  ```
  **Note**: One example is given with query_id of 1, the length limit of the fake response is 4000 character.

3. Start the server in interactive mode
  ```bash
  rails c
  ```
  This should bring you to JRuby interactive console

4. To retrieve the inserted fake response, type in
  ```Ruby
  EdoOracle::Queries.search_students([your_query_id])
  ```
  Note that the stubbed response completely bypass the original function structure and argument required for the provided method.
