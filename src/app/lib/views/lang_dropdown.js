(function (App){
    'use strict';

    App.View.LangDropdown = Backbone.Marionette.ItemView.extend({
        template: '#lang-dropdown-tpl',
        ui: {
            selected: '.selected-lang',
        },
        events: {
            'click .dropdown': 'toggleDropdown',
            'click .flag-icon': 'closeDropdown',
        },

        initialize: function () {
            this.type = this.model.get('type');
            this.handler = this.model.get('handler');
            this.selected = this.model.get('selected') || 'None';
        },

        toggleDropdown: function (e) {
            var el = $(this.el);
            if (el.find('.dropdown').is('.open')) {
                this.closeDropdown(e);
            } else {
                el.find('.dropdown').addClass('open');
                el.find('.dropdown-arrow').addClass('down');
            }

            el.find('.flag-container').fadeIn();
        },

        closeDropdown: function (e) {
            e.preventDefault();
            var el = $(this.el);
            el.find('.flag-container').fadeOut();
            el.find('.dropdown').removeClass('open');
            el.find('.dropdown-arrow').removeClass('down');

            var value = $(e.currentTarget).attr('data-lang');
            if (value) {
                this.model.set('selected', value);
                this.ui.selected.removeClass().addClass('flag toggle selected-lang').addClass(value);
                App.vent.trigger(this.type + ':lang', value);
                this.handler(value);
            }
        },
    });
})(window.App);
