import { Area } from "./area.data";


export { IdentityCard };

/**
 * 身份证类
 */
class IdentityCard {

    private _id: string = '';
    private _err: string = '';

    public result = {
        "is_pass" : false,
        "area": {
            "status": false,
            "result": "",
            "province": "",
            "city": "",
            "county": "",
            "using": 0,
        },
        "gender": "",
        "birthday": "",
        "age": 0,
        "constellation": ""
    };

    private _constellations = [
        "水瓶座",  // 1.21-2.19 [Aquarius]
        "双鱼座",  // 2.20-3.20 [Pisces]
        "白羊座",  // 3.21-4.19 [Aries]
        "金牛座",  // 4.20-5.20 [Taurus]
        "双子座",  // 5.21-6.21 [Gemini]
        "巨蟹座",  // 6.22-7.22 [Cancer]
        "狮子座",  // 7.23-8.22 [Leo]
        "处女座",  // 8.23-9.22 [Virgo]
        "天秤座",  // 9.23-10.23 [Libra]
        "天蝎座",  // 10.24-11.21 [Scorpio]
        "射手座",  // 11.22-12.20 [Sagittarius]
        "魔羯座",  // 12.21-1.20 [Capricorn]
    ];

    private _constellation_edge_days : number[] = [21, 20, 21, 20, 21, 22, 23, 23, 23, 24, 22, 21];
    // private _constellation_edge_days : Array<number> = [21, 20, 21, 20, 21, 22, 23, 23, 23, 24, 22, 21];

    /**
     * Constructor
     * 
     * @param id identity card number
     * @return this
     */
    public constructor(id : string) {
        this._id = id.trim().toUpperCase();
    }

    /**
     * validate identity card
     *
     * @return throw error or return bool
     */
    public validate() {
        let id = this._id;
        if (id == '') {
            this._err = 'identity card number is empty!';
            throw new Error('identity card number is empty!');
        } else {
            const patt = /^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
            var err = '';
            if (patt.test(id)) {
                const _id = id.split('');
                // const _id : Array<number> = id.split('');
                const _factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                const _verify = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
                let [_checksum, _i, _last] = [0, 0, _id[17]];
                for (_i; _i < (_id.length - 1); _i++) {
                    _checksum = _checksum + Number(_id[_i])*_factor[_i];
                }
                const _mod = _checksum%11;
                if (_verify[_mod] != _last) {
                    this._err = 'checksum error!';
                    return false;
                } else {
                    return true;
                }
            } else {
                this._err = 'identity card number illegal!';
                return false;
            }
        }
    }

    /** 
     * Get all information
     * 
     * 
     */
    public info() {
        if (this.validate() == true) {
            this.result.is_pass = true;
            this.result.area = this.area();
            this.result.constellation = this.constellation();
            this.result.birthday = this.birthday();
            this.result.age = Number(this.age());
            this.result.gender = this.gender();
        }
        return this.result;
    }

    /**
     * Get area
     * 
     * @return get area info
     */
    public area() {
        const area = Area;
        const valid : boolean = this.validate();
        this.result.is_pass = valid;
        this.result.area.status = valid;
        if (valid == true) {
            let province = this._id.substr(0, 2) + '0000';
            let city = this._id.substr(0, 4) + '00';
            let county = this._id.substr(0, 6);
            if (area.hasOwnProperty(province)) {
                let _province = area[province].split('|');
                this.result.area.province = _province[0];
                this.result.area.result = _province[0];
                if (area.hasOwnProperty(city)) {
                    let _city = area[city].split('|');
                    this.result.area.city = _city[0];
                    this.result.area.result += ' ' + _city[0];
                }
                if (area.hasOwnProperty(county)) {
                    let _county = area[county].split('|');
                    this.result.area.county = _county[0];
                    this.result.area.using = Number(_county[1]);
                    this.result.area.result += _county[0];
                }
                this.result.area.result = this.result.area.result
            }
        }
        return this.result.area;

    }

    /**
     * Get gender
     *
     * @return get gender : m - male ; f - female
     */
    public gender() {
        const g = Number(this._id.substr(16, 1));
        return (g%2 == 0) ? 'f' : 'm';
    }

    /**
     * Get age
     *
     * @return get current age
     */
    public age() {
        const year = this._id.substr(6, 4);
        const month = this._id.substr(10, 2);
        const day = this._id.substr(12, 2);
        const date = year + '-' + month + '-' + day + ' 00:00:01';
        let t1 = Date.parse(date);
        let t2 = Date.now();
        let t3 = t2 - t1;
        let diff = Number(t3/31536000000);
        return Math.floor(diff);
    }

    /**
     * Get birthday
     *
     * @return get birthday by '%Y%m%d' format
     */
    public birthday() {
        return this._id.substr(6, 8);
    }

    /**
     * Get constellation
     *
     * @return constellation name
     */
    public constellation() {
        const id = this._id;
        let month = Number(id.substr(10, 2));
        month = month - 1;
        const day = Number(id.substr(12, 2));
        let edge_days = this._constellation_edge_days;
        if (day < edge_days[month]) {
            month = month - 1;
        }
        if (month >= 0) {
            return this._constellations[month];
        }
        return this._constellations[11];
    }

}
