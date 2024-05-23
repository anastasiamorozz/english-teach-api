module.exports={
  development : {
   url: 'postgres://postgres:123456@localhost:5432/englishteachdb',
   dialect :  'postgres',
 },
  test : {
    url :  '127.0.0.1' ,
    dialect :  'postgres',
 },
  production : {
   url :  process.env.DATABASE_URL,
    dialect :  'postgres' ,
 }
}