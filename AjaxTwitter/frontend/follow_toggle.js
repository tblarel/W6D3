const APIUtil = require('./api_util');

class FollowToggle {
    
    constructor(el, options) {
        this.$el = $(el);
        this.followState = (this.$el.data('initial-follow-state') || options.followState);
        this.userId = this.$el.data('user-id') || options.userId;
        this.render();
        this.$el.on('click', this.handleClick.bind(this));
    }

    handleClick(event) {
        const followToggle = this;
        event.preventDefault();
        if (this.followState === 'unfollowed') {
            this.followState = 'following';
            this.render();
            APIUtil.followUser(this.userId).then( () => {
                followToggle.followState = 'followed';
                followToggle.render();
            });
        } else if (this.followState === 'followed') {
            this.followState = 'unfollowing';
            this.render();
            APIUtil.unfollowUser(this.userId).then( () => {
                followToggle.followState = 'unfollowed';
                followToggle.render();
            });
        } 
    }

    render() {
        switch (this.followState) {
            case 'followed':
                this.$el.html('Unfollow');
                this.$el.prop('disabled', false);
                break;
            case 'following':
                this.$el.html('Following...');
                this.$el.prop('disabled', true);
                break;
            case 'unfollowed':
                this.$el.html('Follow');
                this.$el.prop('disabled', false);
                break;
            case 'unfollowing':
                this.$el.html('Unfollowing...');
                this.$el.prop('disabled', true);
                break;
        }
    }
}


module.exports = FollowToggle;
