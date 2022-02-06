export const lang = {
    lang: "en",
    zh: {
        "Left click": "鼠标左键",
        "Right click": "鼠标右键",
        "Avatar": "头像"
    },

    /**
     * 
     * @param {String} language 
     */
    setLang: function(language) {
        this.lang = language;
    },

    /**
     * 
     * @param {String} text 
     * @returns {String}
     */
    get: function(text) {
        return this[this.lang][text] || text;
    }
}