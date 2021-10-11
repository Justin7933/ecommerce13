const router = require('express').Router();
const { Category, Product } = require('../../models');

//get all categories
router.get('/', async (req, res) => {
try {
  const categoryData = await Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    ]
  });
  if (!categoryData) {
    res.status(404).json({ message: 'No category found with that id!' });
    return;
  }
  res.status(200).json(categoryData)
} catch (err) {
  res.status(500).json(err)
}
})

//get one category
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Product.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      include: [
        {
          model: Product,
          attributes: ['category_id,', 'id', 'product_name', 'stock', 'price']
        },
      ]
    });
  
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' })
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
Category.create(req.body.category_name)
  
    .then((categoryData) => 
      res.status(200).json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
    id: req.params.id
    },
  })
  .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
})


router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).jason(err);
  }
});

module.exports = router;
