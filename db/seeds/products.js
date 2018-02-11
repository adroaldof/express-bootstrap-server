const tableName = 'products';

exports.seed = (knex, Promise) => { // eslint-disable-line no-unused-vars
  return knex(tableName).del()
    .then(function () {
      return knex(tableName).insert([
        {
          name: 'Old No. 7',
          type: 'wiskey',
          description: 'Mellowed drop by drop through 10-feet of sugar maple charcoal, then matured in handcrafted barrels of our own making',
          tradeMark: 'Jack Daniels',
          model: 'Old No. 7',
          image: 'https://res.cloudinary.com/hjqklbxsu/image/upload/f_auto,fl_lossy,q_auto/v1467746044/product/bottle/old_no7_01_0.png',
          barCode: '73937914883624783101',
          price: 145.12,
        },
        {
          name: 'Single Barrel',
          type: 'wiskey',
          description: 'Selected by our Master Distiller and presented at 129 proof, this high character single barrel Tennessee Whiskey reflects the flavor imparted by our handmade, toasted and charred, American Oak barrels',
          tradeMark: 'Jack Daniels',
          model: 'Barrel Strait',
          image: 'https://res.cloudinary.com/hjqklbxsu/image/upload/f_auto,fl_lossy,q_auto/v1506023947/product/bottle/Barrel-Strength_70cl_Front_final_2.png',
          barCode: '24707654123033613544',
          price: 264.56,
        },
        {
          name: 'Gentleman Jack',
          type: 'wiskey',
          description: 'Inspired by the original gentleman distiller and our founder, Gentleman Jack undergoes a second charcoal mellowing to achieve exceptional smoothness. Its balanced flavor is perfect for celebrating life’s extraordinary occasions, plus all the moments along the way.',
          tradeMark: 'Jack Daniels',
          model: 'Old No. 7',
          image: 'https://res.cloudinary.com/hjqklbxsu/image/upload/f_auto,fl_lossy,q_auto/v1506023947/product/bottle/Barrel-Strength_70cl_Front_final_2.png',
          barCode: '34152119735747585446',
          price: 301.45,
        },
      ]);
    });
};
