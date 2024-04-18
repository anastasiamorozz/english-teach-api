import SequelizeFile from 'sequelize-file';
 
export const picture = SequelizeFile({
   attribute: 'picture',
   mimetype: /^image/,
   crop: true,
   sizes: {
     small: 64, //width 64
     big: 150, //width 150
   }
});
 
export const backgroundImage = SequelizeFile({
  attribute: 'backgroundImage',
  mimetype: /^image/,
  crop: true,
  sizes: {
    preview: "x350" // height 350
  }
});