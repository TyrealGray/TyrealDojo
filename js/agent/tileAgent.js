//get svg by using ajax
function requestTileSvg(color, successCallback, errorCallback) {

    var urlPath = '/color/' + color;

    ajax('GET', urlPath, null, function(data) {
        successCallback(data);
    }, function(data) {
        errorCallback(data);
    });
}

//wrap ajax request
function ajax(type, url, data, success, failed) {
    // create
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

    var type = type.toUpperCase();
    // for clear cache
    var random = Math.random();

    if (typeof data == 'object') {
        var str = '';
        for (var key in data) {
            str += key + '=' + data[key] + '&';
        }
        data = str.replace(/&$/, '');
    }

    if (type == 'GET') {
        if (data) {
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url + '?t=' + random, true);
        }
        xhr.send();

    } else if (type == 'POST') {
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    // reture data
    xhr.onreadystatechange = function() {
        if (4 === xhr.readyState) {
            if (200 === xhr.status) {
                success(xhr.responseText);
            } else {
                if (failed) {
                    failed(xhr.status);
                }
            }
        }
    }
}