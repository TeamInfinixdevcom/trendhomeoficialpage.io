from flask import Flask, render_template
import json

app = Flask(__name__)

# ==== RUTA PRINCIPAL: Muestra INGLÉS ====
@app.route("/")
def home():
    return render_template("en/index.html")


# ==== ESPAÑOL ====
@app.route("/es")
def es_home():
    return render_template("es/index.html")

@app.route('/catalogo')
def catalogo():
    with open('muebles.json', 'r', encoding='utf-8') as f:
        muebles = json.load(f)
    return render_template('es/catalogo.html', muebles=muebles)

@app.route("/nosotros")
def nosotros():
    return render_template("es/nosotrosT.html")

@app.route("/contacto")
def contacto():
    return render_template("es/contacto.html")

@app.route("/checkout")
def checkout():
    return render_template("es/checkout.html")

@app.route("/blog")
def blog():
    with open('post.json', encoding='utf-8') as f:
        posts = json.load(f)
    return render_template("es/blog.html", posts=posts)

@app.route("/blog/<int:post_id>")
def blog_detalle(post_id):
    with open('post.json', encoding='utf-8') as archivo:
        posts = json.load(archivo)
    post = next((p for p in posts if p["id"] == post_id), None)
    if not post:
        return "Post no encontrado", 404
    return render_template("es/blog_detalle.html", post=post)


# ==== INGLÉS ====
@app.route("/en")
def en_home():
    return render_template("en/index.html")

@app.route("/en/catalog")
def en_catalog():
    with open('forniture.json', 'r', encoding='utf-8') as f:
        furniture = json.load(f)
    return render_template('en/catalog.html', furniture_list=furniture)

@app.route("/en/about")
def en_about():
    return render_template("en/about.html")

@app.route("/en/contact")
def en_contact():
    return render_template("en/contact.html")

@app.route("/en/checkout")
def en_checkout():
    return render_template("en/checkout.html")

@app.route("/en/blog")
def en_blog():
    with open('posts_en.json', encoding='utf-8') as f:
        posts = json.load(f)
    return render_template("en/blog.html", posts=posts)

@app.route("/en/blog/<int:post_id>")
def en_blog_detail(post_id):
    with open('posts_en.json', encoding='utf-8') as archivo:
        posts = json.load(archivo)
    post = next((p for p in posts if p["id"] == post_id), None)
    if not post:
        return "Post not found", 404
    return render_template("en/blog_detail.html", post=post)


if __name__ == "__main__":
    app.run(debug=True)
