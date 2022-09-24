window.addEventListener('DOMContentLoaded', () => {
    let button = document.getElementById('calculate');
    const DOTS = 9;

    button.addEventListener('click', () => {
        let output = document.getElementById('output');
        output.replaceChildren();
        let min = document.getElementById('min').value;
        let max = document.getElementById('max').value;

        if(!validate(min, max)) return;

        let ways = noOfConnections(min, max);
        let p = document.createElement('p');
        let txt = document.createTextNode(ways);
        p.appendChild(txt);
        output.appendChild(p);
    });

    function validate(min, max) {
        if(max < min) {
            alert('min has to be less than max');
            return false;
        }
        // if(min < 3) {
        //     alert('min cannot be less than 3');
        //     return false;
        // }

        if(min > 9 || max > 9) {
            alert('min and max cannot be greater than 9');
            return false;
        }
        return true;
    }

    function noOfConnections(min, max) {
        let jump = getJumpArray();
        let visited = new Array(DOTS + 1);
        visited.fill(false);

        let ways = 0;
        let ways2 = 0;
        for(let i = min; i <= max; i++) {
            ways += 4 * totalPatternFromCurrentCell(visited, jump, 1, i - 1);
            ways2 += 4 * totalPatternFromCurrentCellIterative(visited, jump, 1, i - 1);

            ways += 4 * totalPatternFromCurrentCell(visited, jump, 2, i - 1);
            ways2 += 4 * totalPatternFromCurrentCellIterative(visited, jump, 2, i - 1);

            ways += totalPatternFromCurrentCell(visited, jump, 5, i - 1);
            ways2 += totalPatternFromCurrentCellIterative(visited, jump, 5, i - 1);
        }

        console.log(ways2);

        return ways;
    }

    function totalPatternFromCurrentCell(visited, jump, curr, n) {
        if(n == 0) return 1;

        let ways = 0;
        visited[curr] = true;

        for(let i = 1; i <= DOTS; i++) {
            if(!visited[i] &&
                (!jump[i][curr] || visited[jump[i][curr]])) {
                    ways += totalPatternFromCurrentCell(visited, jump, i, n - 1);
                }
        }

        visited[curr] = false;
        return ways;
    }

    function totalPatternFromCurrentCellIterative(visited, jump, curr, n) {
        const stack = [ [curr, n] ];
        visited[curr] = true;
        let ways = 0;

        while(stack.length > 0) {
            const [node, dist] = stack[stack.length - 1];

            if(dist === 0) {
                ways++;
                stack.pop();
                continue;
            }

            if(node === -1) {
                stack.pop();
                const [prev, d] = stack.pop();
                visited[prev] = false;
                continue;
            }

            visited[node] = true;
            stack.push([-1, -1]);

            for(let i = 1; i <= DOTS; i++) {
                if(!visited[i] &&
                    (!jump[i][node] || visited[jump[i][node]])) {
                        stack.push([i, dist - 1]);
                    }
            }
        }

        return ways;
    }

    function getJumpArray() {
        let jump = new Array(DOTS + 1);
        for(let i = 0; i <= DOTS; i++) {
            jump[i] = new Array(DOTS + 1);
            jump[i].fill(0);
        }

        jump[1][3] = jump[3][1] = 2;
        jump[7][9] = jump[9][7] = 8;
        jump[1][7] = jump[7][1] = 4;
        jump[3][9] = jump[9][3] = 6;

        jump[1][9] = jump[9][1] = jump[2][8]
        = jump[8][2] = jump[3][7] = jump[7][3]
        = jump[4][6] = jump[6][4] = 5;

        return jump;
    }
});


// 1 2 3
// 4 5 6
// 7 8 9