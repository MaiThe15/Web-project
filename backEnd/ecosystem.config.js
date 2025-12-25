module.exports = {
  apps: [
    {
      name: "backend",
      script: "/home/ubuntu/backEnd/src/index.js",
      env: {
        PORT: 3000,
        DB_USER: "postgres",
        DB_PASSWORD: "123123123",
        DB_HOST: "localhost",
        DB_PORT: 5432,
        DB_NAME: "cnweb_db",
        JWT_SECRET: "bi_mat_khong_duoc_bat_mi_cnweb_2025"
      }
    }
  ]
};