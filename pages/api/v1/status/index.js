import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  //console.log(updatedAt);

  const databaseResult = await database.query("SHOW server_version;");
  const databaseVersion = databaseResult.rows[0].server_version;

  const databaseMaxConnResult = await database.query("SHOW max_connections;");
  const databaseMaxConnValue = databaseMaxConnResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnValue = databaseOpenedConnResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConnValue),
        opened_connections: databaseOpenedConnValue,
      },
    },
  });
}
export default status;
