const { ctrlWrapper } = require('../../helpers');
const { SalesPosts } = require('../../models/MongooseModels');

const addUrlForSalesPosts = async (req, res) => {
  const postsUrl = req.body;

  const data = await SalesPosts.find({});

  let updatedSalesPhotos = data[0]?.img ? [...data[0].img] : [];

  if (postsUrl.bannerUrl !== '') {
    updatedSalesPhotos = updatedSalesPhotos.map(item =>
      item.id === postsUrl.id
        ? { ...item, bannerUrl: postsUrl.bannerUrl }
        : item
    );
  } else {
    updatedSalesPhotos = updatedSalesPhotos.map(item => ({
      url: item.url,
      id: item.id,
    }));
  }

  const result = await SalesPosts.findByIdAndUpdate(
    data[0]._id,
    {
      img: [...updatedSalesPhotos],
    },
    {
      new: true,
    }
  );

  res.status(200).json(result);
};

module.exports = {
  addUrlForSalesPosts: ctrlWrapper(addUrlForSalesPosts),
};
