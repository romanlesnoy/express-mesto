const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUsers,
  getUser,
  getProfile,
  updateProfile,
  updateProfileAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/me", getUser);
router.get("/users/:id", getProfile);

router.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile
);

router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(
          /^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([\w\W\d]{1,})$/
        ),
    }),
  }),
  updateProfileAvatar
);

module.exports = router;
