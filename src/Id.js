"use strict";
exports.__esModule = true;
var area_data_1 = require("./area.data");
/**
 * 身份证类
 */
var IdentityCard = /** @class */ (function () {
    // private _constellation_edge_days : Array<number> = [21, 20, 21, 20, 21, 22, 23, 23, 23, 24, 22, 21];
    /**
     * Constructor
     *
     * @param id identity card number
     * @return this
     */
    function IdentityCard(id) {
        this._id = '';
        this._err = '';
        this.result = {
            "is_pass": false,
            "area": {
                "status": false,
                "result": "",
                "province": "",
                "city": "",
                "county": "",
                "using": 0
            },
            "gender": "",
            "birthday": "",
            "age": 0,
            "constellation": ""
        };
        this._constellations = [
            "水瓶座",
            "双鱼座",
            "白羊座",
            "金牛座",
            "双子座",
            "巨蟹座",
            "狮子座",
            "处女座",
            "天秤座",
            "天蝎座",
            "射手座",
            "魔羯座",
        ];
        this._constellation_edge_days = [21, 20, 21, 20, 21, 22, 23, 23, 23, 24, 22, 21];
        this._id = id.trim().toUpperCase();
    }
    /**
     * validate identity card
     *
     * @return throw error or return bool
     */
    IdentityCard.prototype.validate = function () {
        var id = this._id;
        if (id == '') {
            this._err = 'identity card number is empty!';
            throw new Error('identity card number is empty!');
        }
        else {
            var patt = /^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
            var err = '';
            if (patt.test(id)) {
                var _id = id.split('');
                // const _id : Array<number> = id.split('');
                var _factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                var _verify = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
                var _a = [0, 0, _id[17]], _checksum = _a[0], _i = _a[1], _last = _a[2];
                for (_i; _i < (_id.length - 1); _i++) {
                    _checksum = _checksum + Number(_id[_i]) * _factor[_i];
                }
                var _mod = _checksum % 11;
                if (_verify[_mod] != _last) {
                    this._err = 'checksum error!';
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                this._err = 'identity card number illegal!';
                return false;
            }
        }
    };
    /**
     * Get all information
     *
     *
     */
    IdentityCard.prototype.info = function () {
        if (this.validate() == true) {
            this.result.is_pass = true;
            this.result.area = this.area();
            this.result.constellation = this.constellation();
            this.result.birthday = this.birthday();
            this.result.age = Number(this.age());
            this.result.gender = this.gender();
        }
        return this.result;
    };
    /**
     * Get area
     *
     * @return get area info
     */
    IdentityCard.prototype.area = function () {
        var area = area_data_1.Area;
        var valid = this.validate();
        this.result.is_pass = valid;
        this.result.area.status = valid;
        if (valid == true) {
            var province = this._id.substr(0, 2) + '0000';
            var city = this._id.substr(0, 4) + '00';
            var county = this._id.substr(0, 6);
            if (area.hasOwnProperty(province)) {
                var _province = area[province].split('|');
                this.result.area.province = _province[0];
                this.result.area.result = _province[0];
                if (area.hasOwnProperty(city)) {
                    var _city = area[city].split('|');
                    this.result.area.city = _city[0];
                    this.result.area.result += ' ' + _city[0];
                }
                if (area.hasOwnProperty(county)) {
                    var _county = area[county].split('|');
                    this.result.area.county = _county[0];
                    this.result.area.using = Number(_county[1]);
                    this.result.area.result += _county[0];
                }
                this.result.area.result = this.result.area.result;
            }
        }
        return this.result.area;
    };
    /**
     * Get gender
     *
     * @return get gender : m - male ; f - female
     */
    IdentityCard.prototype.gender = function () {
        var g = Number(this._id.substr(16, 1));
        return (g % 2 == 0) ? 'f' : 'm';
    };
    /**
     * Get age
     *
     * @return get current age
     */
    IdentityCard.prototype.age = function () {
        var year = this._id.substr(6, 4);
        var month = this._id.substr(10, 2);
        var day = this._id.substr(12, 2);
        var date = year + '-' + month + '-' + day + ' 00:00:01';
        var t1 = Date.parse(date);
        var t2 = Date.now();
        var t3 = t2 - t1;
        var diff = Number(t3 / 31536000000);
        return Math.floor(diff);
    };
    /**
     * Get birthday
     *
     * @return get birthday by '%Y%m%d' format
     */
    IdentityCard.prototype.birthday = function () {
        return this._id.substr(6, 8);
    };
    /**
     * Get constellation
     *
     * @return constellation name
     */
    IdentityCard.prototype.constellation = function () {
        var id = this._id;
        var month = Number(id.substr(10, 2));
        month = month - 1;
        var day = Number(id.substr(12, 2));
        var edge_days = this._constellation_edge_days;
        if (day < edge_days[month]) {
            month = month - 1;
        }
        if (month >= 0) {
            return this._constellations[month];
        }
        return this._constellations[11];
    };
    return IdentityCard;
}());
exports.IdentityCard = IdentityCard;
