const router = require('express').Router();
const { getUsers,
        getProfile,
        createProfile,
        updateProfile,
        updateProfileAvatar} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getProfile);
router.post('/users', createProfile);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateProfileAvatar);

module.exports = router;
