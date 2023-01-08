from app.models import db, Topic, environment, SCHEMA
from datetime import datetime, date

now = date.today()


def seed_topics():
    food = Topic(name='Food', topicimage='https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg', createdAt= now, updatedAt= now)
    tech = Topic(name='Technology', topicimage='https://www.nato.int/nato_static_fl2014/assets/pictures/images_mfu/2022/7/stock/technology_rdax_775x440s.jpg', createdAt= now, updatedAt= now)
    travel = Topic(name='Travel', topicimage='https://hips.hearstapps.com/hmg-prod/images/where-to-travel-in-2022-1640200544.jpg', createdAt= now, updatedAt= now)
    book = Topic(name='Books', topicimage='https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg', createdAt= now, updatedAt= now)
    movie = Topic(name='Movies', topicimage='https://s3-us-west-2.amazonaws.com/prd-rteditorial/wp-content/uploads/2018/03/13153742/RT_300EssentialMovies_700X250.jpg', createdAt= now, updatedAt= now)


    db.session.add(food)
    db.session.add(tech)
    db.session.add(travel)
    db.session.add(book)
    db.session.add(movie)

    db.session.commit()


def undo_topics():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.topics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM topics")

    db.session.commit()
