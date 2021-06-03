const b1 = document.getElementById('first')
const b2 = document.getElementById('second')
const d1 = document.getElementById('d1')
const d2 = document.getElementById('d2')


function longestCommonSubsequence(text1, text2) {
    // Create dp table
    const dp = Array(text1.length+1).fill(0).map(() => Array(text2.length+1).fill(0))
    for(let i = 1; i < dp.length; i++) {
        for(let j = 1; j < dp[i].length; j++) {
            // If the letters match, look diagonally to get the max subsequence before this letter and add one
            if(text1[i-1]===text2[j-1]){
                dp[i][j] = dp[i-1][j-1] + 1
            } else {
                // If there is no match, set the cell to the previous current longest subsequence
                dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j])
            }
        }
    }

    
    let i = text1.length
    let j = text2.length

    let delSource = new Set()
    let addDest = new Set()

    while ( i > 0 && j > 0 ) {

        if (text1[i - 1] == text2[j - 1]) {

            i -= 1
            j -= 1
        }

        else {
            if ( dp[i - 1][j] > dp[i][j - 1] ) {
                delSource.add(i - 1)
                i -= 1
            }
            else {
                addDest.add(j - 1)
                j -= 1
            }
        }

    }

    while ( j > 0 ) {
        addDest.add(j - 1)
        j -= 1
    }
    while ( i > 0 ) {
        delSource.add(i - 1)
        i -= 1
    }


    let sourceSp = text1.split('')
    let destSp = text2.split('')

    let source_ = ""
    for( let i = 0; i < sourceSp.length; i++ ) {
        // let curr = sourceSp[i]
        // if (curr == '\n') {
        //     source_ += `<br /><span class="view-line red">${curr}</span>`
        //     continue
        // }
        if ( delSource.has(i) ) {
            let cls = 'red '
            let br = ''
            let el = 'span'
            if (sourceSp[i] == '\n') {
                cls += 'view-line '
                // br = '<br />'
                el = 'div'
            }
            source_ += `${br}<${el} class='${cls}'>${sourceSp[i]}</${el}>`
        }
        else {
            source_ += `<span>${sourceSp[i]}</span>`
        }
    }

    let dest_ = ""
    for( let i = 0; i < destSp.length; i++ ) {
        // if (destSp[i] == '\n') {
        //     dest_ += `<br /><span class="view-line green">${destSp[i]}</span>`
        //     continue
        // }
        if ( addDest.has(i) ) {
            let cls = 'green '
            let br = ''
            let el = 'span'
            if (destSp[i] == '\n') {
                cls += 'view-line '
                destSp[i] = "&nbsp;"
                el = 'div'
            }
            dest_ += `${br}<${el} class='${cls}'>${destSp[i]}</${el}>`
        }
        else {
            dest_ += `<span>${destSp[i]}</span>`
        }
    }

    d1.innerHTML = source_
    d2.innerHTML = dest_

    return dp[text1.length][text2.length]
};


function calculateLevDistance(src, tgt) {
    var realCost;
    
    var srcLength = src.length,
        tgtLength = tgt.length,
        tempString, tempLength; // for swapping
    
    var resultMatrix = new Array();
        resultMatrix[0] = new Array(); // Multi dimensional
    
    // To limit the space in minimum of source and target,
    // we make sure that srcLength is greater than tgtLength
    if (srcLength < tgtLength) {
        tempString = src; src = tgt; tgt = tempString;
        tempLength = srcLength; srcLength = tgtLength; tgtLength = tempLength;
    }
    
    for (var c = 0; c < tgtLength+1; c++) {
        resultMatrix[0][c] = c;
    }
    
    for (var i = 1; i < srcLength+1; i++) {
        resultMatrix[i] = new Array();
        resultMatrix[i][0] = i;
        for (var j = 1; j < tgtLength+1; j++) {
            realCost = (src.charAt(i-1) == tgt.charAt(j-1))? 0: 1;
            resultMatrix[i][j] = Math.min(
                resultMatrix[i-1][j]+1,
                resultMatrix[i][j-1]+1,
                resultMatrix[i-1][j-1] + realCost // same logic as our previous example.
            ); 
        }
    }

    
    return resultMatrix[srcLength][tgtLength];
}

const handler = () => {
    
    let source = b1.value
    let destination = b2.value

    // source = source.replace('\n', '®')
    // destination = destination.replace('\n', '®')


    longestCommonSubsequence(source, destination)
    // calculateLevDistance(source, destination)
}

b1.addEventListener('input', handler)
b2.addEventListener('input', handler)
