App.filter('limitToNum', function() {
    return function(input, num) {
        if(input.length>num){
            input = input.substring(0,num)+"...";
        }
        return input;
    };
});