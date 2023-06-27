from flask import Flask

app = Flask(__name__)


# SEED DATA
dogs = [
    {
        id: 1,
        'name': 'Tilly',
        'age': 9,
        'sex': 'F',

    },
    {
        id: 2,
        'name': 'Bear',
        'age': 3,
        'sex': 'M',
    },
    {
        id: 3,
        'name': 'Rusky',
        'age': 5,
        'sex': 'M',

    },
]


# test api route
@app.route("/test")
def test():
    return {
        'test1': 'hello',
        'test2': 'world'
    }


if __name__ == "__main__":
    app.run(debug=True)  # set to DEBUG mode for now
