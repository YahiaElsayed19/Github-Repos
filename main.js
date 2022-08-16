let theInput = document.querySelector(".get-repos input")
let getBtn = document.querySelector(".get-btn")
let reposData = document.querySelector(".show-data")

getBtn.onclick = function () {
    getRepos()
}

function getRepos() {
    if (theInput.value == "") {
        reposData.innerHTML = `<span>Please write github username</span>`
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
            .then((response) => response.json())
            .then((data) => {
                reposData.innerHTML = ""
                data.forEach(repo => {
                    //create div container
                    let mainDiv = document.createElement("div")
                    mainDiv.className="repo-box"
                    // create repo name div
                    let repoName = document.createTextNode(repo.name)
                    mainDiv.appendChild(repoName)
                    // create repo's url
                    let theUrl = document.createElement("a")
                    let theUrlText = document.createTextNode("Visit")
                    theUrl.appendChild(theUrlText)
                    theUrl.href = `https://github.com/${theInput.value}/${repo.name}`
                    theUrl.setAttribute("target", "_blank")
                    mainDiv.appendChild(theUrl)
                    //create stars span
                    let starsSpan = document.createElement("span")
                    let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`)
                    starsSpan.appendChild(starsText)
                    mainDiv.appendChild(starsSpan)

                    reposData.appendChild(mainDiv)
                });
            })
    }
}