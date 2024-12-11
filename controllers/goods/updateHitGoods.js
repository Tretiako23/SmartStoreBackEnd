const { HttpError, ctrlWrapper } = require('../../helpers');
const { Goods } = require('../../models/MongooseModels');

const updateHitGoods = async (req, res) => {
  const { id, isHit } = req.params;

  const goodsItem = await Goods.findById(id);
  if (!goodsItem) {
    throw HttpError(404, 'Not found');
  }

  const result = await Goods.findByIdAndUpdate(
    id,
    {
      isHit,
    },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = {
  updateHitGoods: ctrlWrapper(updateHitGoods),
};
