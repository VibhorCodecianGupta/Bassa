from abc import ABC, abstractmethod

class User:
    def __init__(self, id, userName, password, auth, email):
        self.id=id
        self.userName=userName
        self.password=password
        self.auth=auth
        self.email=email


class AuthLeval:
    ADMIN, STUDENT, ACADEMIC, NONACADEMIC= list(range(4))


class EntityInterface(ABC):

    @abstractmethod
    def create(self, entity: EntityInterface):
        """
        creates an entity to the parent.
        """

    @abstractmethod
    def delete(self, entity: EntityInterface):
        """
        deletes an entity from the parent.
        """

    @abstractmethod
    def update(self, entity: EntityInterface):
        """
        updates an entity of the parent.
        """

    @abstractmethod
    def get(self, entity: EntityInterface):
        """
        gets an entity of the parent.
        """

    @abstractmethod
    def get_all(self, entity: EntityInterface):
        """
        gets all entities of the parent.
        """


class Download:
    def __init__(self, link, userName, id=None):
        self.link=link
        self.userName=userName
        self.id=id
        self.gid=None

    def __str__(self):
        return "id: %s, user: %s, link: %s, gid: %s" % (self.id, self.userName, self.link, self.gid)


class Status:

    DEFAULT, STARTED, DELETED, COMPLETED, ERROR= list(range(5))
