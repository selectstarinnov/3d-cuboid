const fs = require('fs');
const requirePath = require("../requirePath.ts")
const {dirname} = requirePath("server/utils.ts")

const configSetting = () => {
    const inputPath = `${dirname}/input`;
    let response = [];
    try{
        const inputFolders = fs.readdirSync(inputPath, {withFileTypes: true});

        inputFolders.forEach(elm => {
            if(elm.isDirectory()){
                const item = {}
                const name = elm.name;
                item['name'] = name;
                const innerDirectories = `${inputPath}/${name}`
                let sequence = [];
                try {
                    const inner = fs.readdirSync(innerDirectories, {withFileTypes: true});
                    inner.forEach(l2Elm => {
                        if(l2Elm.isDirectory()){
                            const l2Name = l2Elm.name;
                            sequence.push(l2Name.normalize())
                        }
                    })
                }catch (e){

                }
                item['sequences'] = sequence;
                if(sequence.length > 0){
                    response = [
                        ...response,
                        item
                    ]
                }
            }
        })
    }catch(e){

    }
    return {
        "datasets": response
    }
}

module.exports = {configSetting}