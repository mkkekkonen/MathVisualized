const movie = bonsai.run(document.getElementById('canvas'), {
    url: '/static/js/bonsai_movie_bundles/quadraticequation.js',
    width: 480,
    height: 480,
});

document.getElementById('updateButton').addEventListener('click', () => {
    movie.sendMessage('updateEquation', {
        a: parseFloat(document.getElementById('a').value),
        b: parseFloat(document.getElementById('b').value),
        c: parseFloat(document.getElementById('c').value),
    });
});
