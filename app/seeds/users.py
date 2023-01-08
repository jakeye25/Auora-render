from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    David = User(
        username='David', email='david@aa.io', password='password', avatar='https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg', bio='App Academy educated Algo Enthusiast', description='Oh and follow pls! Hi! It appears you have stumbled upon my account!')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', avatar='https://images.pexels.com/photos/735423/pexels-photo-735423.jpeg', bio='Self employed', description='How am I supposed to give you any descriptions? You want?', followers=[David])
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', avatar='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png', bio='I worked at an animal shelter and received advance training.', description='I have four cats of my own and worked at an animal shelter for six years until they closed down due to the coronavirus.', followers=[David])
    jimgreen = User(
        username='jimgreen', email='jimgreen@aa.io', password='password', avatar='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png', bio='', description='', following=[David])
    meimei = User(
        username='meimeihan', email='meimeihan@aa.io', password='password', avatar='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png', bio='', description='')
    doodle = User(
        username='doodle', email='doodle@aa.io', password='password', avatar='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png', bio='', description='')
    goofy = User(
        username='goofy', email='goofy@aa.io', password='password', avatar='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png', bio='', description='')
    charlie = User(
        username='charlie', email='charlie@aa.io', password='password', avatar='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png', bio='', description='')
    william = User(
        username='william', email='william@aa.io', password='password', avatar='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png', bio='', description='')
    glenny = User(
        username='glenny', email='glenny@aa.io', password='password', avatar='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png', bio='', description='')

    db.session.add(David)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(jimgreen)
    db.session.add(meimei)
    db.session.add(doodle)
    db.session.add(goofy)
    db.session.add(charlie)
    db.session.add(william)
    db.session.add(glenny)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
