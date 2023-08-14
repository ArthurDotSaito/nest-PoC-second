FROM postgres

RUN usermod -u 1000 postgres

# Change the ownership of the PostgreSQL data directory
RUN chown -R postgres:postgres /var/lib/postgresql/data