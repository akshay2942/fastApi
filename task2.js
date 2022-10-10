


problem  2
Find the longest substring with repeating characters
function sort(names)
{
    string="";
    ss="";
    namestring=names.split("");

    for(j=0;j<namestring.length;j++) {
        for(i=j;i<namestring.length;i++) {
            if(string.includes(namestring[i]))
                break;
            else
                string+=namestring[i];
         }
         if(ss.length<string.length)
             ss=string;
         string="";
    }
    return ss;
}
console.log(sort("pwwkew"));
-----------------------------------------------------------------------------------------------------------------------
problem  3
Find the longest palindrome from the given string

function is_Palindrome(str1) {
    var rev = str1.split("").reverse().join("");
    return str1 == rev;
    }
    
    function longest_palindrome(str1){
    
    var max_length = 0,
    maxp = '';
    
    for(var i=0; i < str1.length; i++) 
    {
    var subs = str1.substr(i, str1.length);
    
    for(var j=subs.length; j>=0; j--) 
    {
    var sub_subs_str = subs.substr(0, j);
    if (sub_subs_str.length <= 1)
    continue;
    
    if (is_Palindrome(sub_subs_str))
    {
    if (sub_subs_str.length > max_length) 
    {
    max_length = sub_subs_str.length;
    maxp = sub_subs_str;
    }
    }
    }
    }
    
    return maxp;
    }
    console.log(longest_palindrome("ababad"));
    
   