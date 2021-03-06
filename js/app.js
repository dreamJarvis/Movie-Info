const movie = document.querySelector('#movieName');
const search = document.querySelector('#search');

search.addEventListener('click', searchMovie);

function searchMovie() {
    const movieName = movie.value;

    let tmpName = '';
    for (let i = 0; i < movieName.length; i++) {
        if (movieName[i] == " ") {
            tmpName += '+';
            continue;
        }
        tmpName += movieName[i];
    }

    fetch(`https://www.omdbapi.com/?apikey=d03230c8&t=${tmpName}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then((data) => {
            if (data.Response == 'False') {
                throw Error(data.Response); // error handling
            }
            return data;
        })
        .then(data => {
            let output =
                `
                <div class="row">
                <div class="col-4" id="box-1">
                    <div class="card text-center" id="poster" style="width: 18rem; margin: auto;">
                        <img src="${data.Poster}" class="card-img-top">
                        <div class="card-body">
                            <p class="card-text">${data.Plot}</p>
                        </div>
                    </div>
                </div>
                <div class="col" id="box-2">
                    <div class="list-group">
                        <li class="list-group-item active text-white text-center">
                            <h5 class="card-title">
                                <h3 class="display-6">${data.Title}</h3>
                            </h5>
                        </li>
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-md-3 listHeading">
                                    <p class="text-center heading">Directors </p>
                                </div>
                                <div class="col listContent" style="margin: auto auto;">
                                    <p>
                                        <small>${data.Director}</small>
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item ">
                            <div class="row">
                                <div class="col-md-3 listHeading">
                                    <p class="text-center heading">Writers </p>
                                </div>
                                <div class="col listContent" style="margin: auto;">
                                    <p>
                                        <small>${data.Writer}</small>
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item ">
                            <div class="row">
                                <div class="col-md-3 listHeading">
                                    <p class="text-center heading">Cast </p>
                                </div>
                                <div class="col listContent" style="margin: auto;">
                                    <p>
                                        <small>${data.Actors}</small>
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item ">
                            <div class="row">
                                <div class="col-md-3 listHeading">
                                    <p class="text-center heading">Box Office </p>
                                </div>
                                <div class="col listContent" style="margin: auto;">
                                    <p>
                                        <small>${data.BoxOffice}</small>
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item ">
                            <div class="row">
                                <div class="col-md-3 listHeading">
                                    <p class="text-center heading">Awards</p>
                                </div>
                                <div class="col listContent" style="margin: auto;">
                                    <p>
                                        <small>${data.Awards}</small>
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item ">
                            <div class="row">
                                <div class="col-md-3 listHeading">
                                    <p class="text-center heading">Genere</p>
                                </div>
                                <div class="col listContent" style="margin: auto;">
                                    <p>
                                        <small>${data.Genre}</small>
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item ">
                            <div class="row">
                                <div class="col-md-3 listHeading">
                                    <p class="text-center heading">Released</p>
                                </div>
                                <div class="col listContent" style="margin: auto;">
                                    <p>
                                        <small>${data.Released}</small>
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item ">
                            <div class="row">
                                <div class="col-md-3 listHeading">
                                    <p class="text-center heading">Imbd Rating</p>
                                </div>
                                <div class="col listContent" style="margin: auto;">
                                    <p>
                                        <small>${data.imdbRating}</small>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </div>
                </div>
            </div>
            `;
            document.querySelector('#movieInfo').innerHTML = output;
        })
        .catch((err) => {
            document.querySelector('#movieInfo').innerHTML = '';
            let errMsg = new bootstrap.Modal(document.getElementById('errorMsg'), {
                keyboard: false
            });
            errMsg.show();

            // clear's the input bay, when modal closes
            document.querySelector("#errorMsg").addEventListener('hide.bs.modal', (e) => {
                document.querySelector('#movieName').value = "";
            })
        });
};