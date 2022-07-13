/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient, Prisma } from '@prisma/client';
import { uuid } from 'short-uuid';

const prisma = new PrismaClient();

async function createUser(opts: {
  user: Prisma.UserCreateInput;
  posts: Array<Prisma.PostCreateInput>;
  notifications: Array<Prisma.NotificationCreateInput>;
  lists: Array<Prisma.ListCreateInput>;
}) {
  const user = await prisma.user.findFirst({
    where: {
      email: opts.user.email,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    console.log(
      `👤 '${opts.user.id}' with email "${opts.user.email}"" already seems seeded`,
    );
  } else {
    await prisma.user.upsert({
      where: { id: opts.user.id },
      update: opts.user,
      create: opts.user,
    });

    console.log(
      `👤 Upserted '${opts.user.id}' with email "${opts.user.email}"".`,
    );
  }

  for (const postInput of opts.posts) {
    const post = await prisma.post.findFirst({
      where: {
        title: postInput.title,
      },
      select: {
        id: true,
      },
    });

    if (post) {
      console.log(`\t📄 Post "${postInput.title}" already seems seeded`);
      continue;
    }
    await prisma.post.create({
      data: { ...postInput },
    });

    console.log(`\t📄 Post "${postInput.title}"`);
  }

  for (const notificationInput of opts.notifications) {
    const notification = await prisma.notification.findFirst({
      where: {
        title: notificationInput.title,
      },
      select: {
        id: true,
      },
    });

    if (notification) {
      console.log(
        `\t🔔 Notification "${notificationInput.title}" already seems seeded`,
      );
      continue;
    }
    await prisma.notification.create({
      data: {
        ...notificationInput,
      },
    });
    console.log(
      `\t🔔 Created notification ${notificationInput.title} at ${notificationInput.createdAt}`,
    );
  }

  for (const listInput of opts.lists) {
    const list = await prisma.list.findFirst({
      where: {
        name: listInput.name,
      },
      select: {
        id: true,
      },
    });

    if (list) {
      console.log(`\t📝 List "${listInput.name}" already seems seeded`);
      continue;
    }
    await prisma.list.create({
      data: {
        ...listInput,
      },
    });
    console.log(`\t📝 Created list "${listInput.name}"`);
  }

  return user;
}

async function main() {
  const userId = uuid();
  await createUser({
    user: {
      id: userId,
      email: 'leog@example.com',
      name: 'leog',
      avatar: '/img/leog.jpg',
    },
    notifications: [
      {
        title: 'New friend request',
        createdAt: new Date('05-06-2022 13:06:00'),
        user: {
          connect: {
            id: userId,
          },
        },
      },
      {
        title: 'Please change your password',
        createdAt: new Date('06-06-2022 04:00:00'),
        user: {
          connect: {
            id: userId,
          },
        },
      },
      {
        title: 'You have a new message',
        createdAt: new Date('07-01-2022 17:34:02'),
        user: {
          connect: {
            id: userId,
          },
        },
      },
      {
        title: 'Welcome to the app!',
        createdAt: new Date('02-01-2022 10:29:27'),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    ],
    posts: [
      {
        title: 'Exploring Maui',
        content:
          'We just got back from a trip to Maui, and we had a great time...',
        image:
          'https://images.unsplash.com/photo-1610235554447-41505d7962f8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=882&q=80',
        author: {
          connect: {
            id: userId,
          },
        },
      },
      {
        title: 'Arctic Adventures',
        content:
          'Last month we took a trek to the Arctic Circle. The isolation was just what we needed after...',
        image:
          'https://images.unsplash.com/photo-1610212594948-370947a3ba0b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
        author: {
          connect: {
            id: userId,
          },
        },
      },
      {
        title: 'Frolicking in the Faroe Islands',
        content:
          'The Faroe Islands are a North Atlantic archipelago located 320 kilometres (200 mi) north-northwest of Scotland...',
        image:
          'https://images.unsplash.com/photo-1610155180433-9994da6a323b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        author: {
          connect: {
            id: userId,
          },
        },
      },
    ],
    lists: [
      {
        name: 'Groceries',
        items: {
          create: [
            { name: 'Apples' },
            { name: 'Bananas' },
            { name: 'Milk' },
            { name: 'Ice Cream' },
          ],
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      {
        name: 'Hardware Store',
        items: {
          create: [
            { name: 'Circular Saw' },
            { name: 'Tack Cloth' },
            { name: 'Drywall' },
            { name: 'Router' },
          ],
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      {
        name: 'Work',
        items: {
          create: [{ name: 'TPS Report' }, { name: 'Set up mail' }],
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      {
        name: 'Reminders',
        user: {
          connect: {
            id: userId,
          },
        },
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
