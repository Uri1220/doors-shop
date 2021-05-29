const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/userModal')
const { getToken, isAuth } = require('../util');
const expressAsyncHandler = require('express-async-handler');

const { check, validationResult } = require('express-validator')


//SIGNIN
//Basir

// router.post(
//   '/signin',
//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       if (bcrypt.compareSync(req.body.password, user.password)) {
//         res.send({
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin,
//           // isSeller: user.isSeller,
//           // token: generateToken(user),
//           token: getToken(user),
//         });
//         return;
//       }
//     }
//     res.status(401).send({ message: 'Invalid email or password' });

//   })
// );

//Vlad
router.post(
  '/signin',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {

    // const token = req.headers.authorization;
    //   console.log('onlyToken',token)
;
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при входе в систему'
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }
      //Vlad
      // const token = jwt.sign(
      //   { userId: user.id },
      //   config.get('jwtSecret'),
      //   { expiresIn: '1h' }
      // )
      // res.json({ token, userId: user.id })

      //Basir from utils.js
      // const getToken = (user) => {
      //   return jwt.sign(
      //     {
      //       _id: user._id,
      //       name: user.name,
      //       email: user.email,
      //       isAdmin: user.isAdmin,
      //     },
      //     config.get('jwtSecret'),
      //     {
      //       expiresIn: '48h',
      //     }
      //   );
      // };

      res.json({
        //  token: getToken(user),
        //  userId: user.id ,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: getToken(user),
      })

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })
//END SIGNIN


/// REGISTER

//Basir
// router.post('/register', async (req, res) => {
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8),
//   });
//   const newUser = await user.save();
//   if (newUser) {
//     res.send({
//       _id: newUser.id,
//       name: newUser.name,
//       email: newUser.email,
//       isAdmin: newUser.isAdmin,
//       token: getToken(newUser),
//     });
//   } else {
//     res.status(401).send({ message: 'Invalid User Data.' });
//   }
// });

//Vlad
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 3 символов')
      .isLength({ min:3 , max:8})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при регистрации'
        })
      }

      const { email, password } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({
        name: req.body.name,
        email,
        password: hashedPassword,
      })

      await user.save()

      res.status(201).json({ message: 'Пользователь создан' })

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

//// END REGISTER

router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

router.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      // if (user.isSeller) {
      //   user.seller.name = req.body.sellerName || user.seller.name;
      //   user.seller.logo = req.body.sellerLogo || user.seller.logo;
      //   user.seller.description =
      //     req.body.sellerDescription || user.seller.description;
      // }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        // isSeller: user.isSeller,
        token: getToken(updatedUser),
      });
    }
  })
);

// router.get('/createadmin', async (req, res) => {
//   try {
//     const user = new User({
//       name: 'Basir',
//       email: 'admin@example.com',
//       password: '1234',
//       isAdmin: true,
//     });
//     const newUser = await user.save();
//     res.send(newUser);
//   } catch (error) {
//     res.send({ message: error.message });
//   }
// });

// router.post('/signin', async (req, res) => {
//   const signinUser = await User.findOne({
//     email: req.body.email,
//     password: req.body.password,
//   });
//   if (signinUser) {
//     res.send({
//       _id: signinUser.id,
//       name: signinUser.name,
//       email: signinUser.email,
//       isAdmin: signinUser.isAdmin,
//       token: getToken(signinUser),
//     });
//   } else {
//     res.status(401).send({ message: 'Invalid Email or Password.' });
//   }
// });

// router.put('/:id', isAuth, async (req, res) => {
//   const userId = req.params.id;
//   const user = await User.findById(userId);
//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.password = req.body.password || user.password;
//     const updatedUser = await user.save();
//     res.send({
//       _id: updatedUser.id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: getToken(updatedUser),
//     });
//   } else {
//     res.status(404).send({ message: 'User Not Found' });
//   }
// });





module.exports = router 