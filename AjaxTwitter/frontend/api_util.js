const APIUtil = {
    followUser: id => APIUtil.changeFollowStatus(id, 'POST'),
    unfollowUser: id => APIUtil.changeFollowStatus(id, 'DELETE'),

    changeFollowStatus: (id, method) => (
        $.ajax({
            url: `/users/${id}/follow`,
            dataType: 'json',
            method
        })
    ),
    searchUsers: query => (
        $.ajax({
            url: '/users/search',
            method: 'get',
            dataType: 'json',
            data: { query }
        })
    )
};

module.exports = APIUtil;
