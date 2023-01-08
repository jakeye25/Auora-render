from app.models import db, Question, environment, SCHEMA
from datetime import datetime, date

now = date.today()

def seed_questions():
    question01 = Question(questioncontent='What is the most dangerous book in the world?', userId = 1, topicId = 4, createdAt= now, updatedAt= now)
    question02 = Question(questioncontent='What is the longest Harry Potter book?', userId = 2, topicId = 4, questionimage='https://m.media-amazon.com/images/I/61H1Vt5PpyL._AC_SY350_.jpg', createdAt= now, updatedAt= now)
    question03 = Question(questioncontent='What is one food that only Germans eat?', userId = 3, topicId = 1, createdAt= now, updatedAt= now)
    question04 = Question(questioncontent='What is the best restaurant in Las Vegas?', userId = 4, topicId = 1, questionimage='https://media.timeout.com/images/105491872/image.jpg', createdAt= now, updatedAt= now)
    question05 = Question(questioncontent='When did you start feeling "old" in the tech industry?', userId = 1, topicId = 2, createdAt= now, updatedAt= now)
    question06 = Question(questioncontent='What is the easiest way to make money online?', userId = 5, topicId = 2, questionimage = 'https://i0.wp.com/calmatters.org/wp-content/uploads/2022/03/California-technology.jpg', createdAt= now, updatedAt= now)
    question07 = Question(questioncontent='What is it like to live in a small town in Australia?', userId = 1, topicId = 3, createdAt= now, updatedAt= now)
    question08 = Question(questioncontent='How long will your trip take in hours if you travel 400 km at an average speed of 80 km/h?', userId = 6, topicId = 3, createdAt= now, updatedAt= now)
    question09 = Question(questioncontent='Was an actor ever fired for reasons other than their acting talent?', userId = 7, topicId = 5, createdAt= now, updatedAt= now)
    question10 = Question(questioncontent='Where can I download a movie?', userId = 8, topicId = 5, createdAt= now, updatedAt= now)


    db.session.add(question01)
    db.session.add(question02)
    db.session.add(question03)
    db.session.add(question04)
    db.session.add(question05)
    db.session.add(question06)
    db.session.add(question07)
    db.session.add(question08)
    db.session.add(question09)
    db.session.add(question10)

    db.session.commit()


def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM questions")

    db.session.commit()
