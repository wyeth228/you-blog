export default class Valid {
  email(email: any): boolean {
    if (typeof email !== "string") {
      return false;
    }

    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return false;
    }

    return true;
  }

  username(username: any): boolean {
    if (typeof username === "string") {
    }

    return true;
  }

  password(password: any): boolean {
    if (typeof password === "string") {
    }

    return true;
  }
}
