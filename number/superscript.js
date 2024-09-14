function suffix(n) {
    let suffix = "th";
    if (n % 10 === 1 && n % 100 !== 11) {
        suffix = "st";
    } else if (n % 10 === 2 && n % 100 !== 12) {
        suffix = "nd";
    } else if (n % 10 === 3 && n % 100 !== 13) {
        suffix = "rd";
    }
    return n + "<sup>" + suffix + "</sup>";
}
