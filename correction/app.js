function dateDiffInDays(date) {
    const today = new Date();
    const diff = today - new Date(date);
    return Math.floor(diff / 1000 / 60 / 60 / 24);
}

function deleteCardIf(card) {
    if (card) {
        card.remove();
    }
}

function getUser(username) {
    const url = `https://api.github.com/users/${username}`;
    
    return fetch(url).then(function (response) {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Utilisateur non trouvé');
            }
            throw new Error('Une erreur s\'est produite lors de la requête.');
        }

        return response.json();
    });
    /*
    let response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Utilisateur non trouvé');
        }
        throw new Error('Une erreur s\'est produite lors de la requête.');
    }

    return response.json();
    */
}

function showError(error) {
    const div = document.createElement('div');
    div.classList.add('error');
    div.innerHTML = `<p>${error.message}</p>`;
    document.querySelector('.container').appendChild(div);
    setTimeout(function() {
        document.querySelector('.error').remove();
    }, 5000);
}

function showUser(user) {
    deleteCardIf(document.querySelector('.card'));

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML += `
        <img src="${user.avatar_url}" alt="user profile picture">
        <h2>${user.login}</h2>
        <h3>${user.name}</h3>
        <p>Utilisateur créé le ${new Date(
            user.created_at
        ).toLocaleDateString()}, il y a ${dateDiffInDays(
        user.created_at
    )} jours</p>
        <p>Nombre de repos: ${user.public_repos}</p>
        <a class="button" href="${user.html_url}">Voir</a>`;

    document.querySelector('.result').append(card);
}
/*
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="username"]').value;

    getUser(username).then(function(user) {
        showUser(user);
    }).catch(function (error) {
        showError(new Error(error.message || 'Une erreur inconnue s\'est produite.'));
    });
});
*/

function commanderPizza(type) {
    
    return new Promise(function(resolve, reject) {
        // Simulons une opération asynchrone avec setTimeout
        setTimeout(() => {
            if (type === 'Margarita') {
                return resolve('Pizza Margarita prête !');  // Tout s'est bien passé.
            } else {
                return reject('Désolé, rupture de mozzarella.');  // Il y a eu une erreur.
            }
        }, 2000);  // Attendre 2 secondes.
    });
}

/*
document.addEventListener('DOMContentLoaded', function () {
    commanderPizza('Margaritatt')
      .then((result) => {
          console.log(result);
      }).catch((error) => {
          console.error(error);
      });
});
*/

// Methode 2
document.addEventListener('DOMContentLoaded', async function () {
    try {
        let result = await commanderPizza('Margaritatt');
        console.log(result);
    } catch (error) {
        console.error(error);
    }
});









































