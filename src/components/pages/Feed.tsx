import Image from "next/image";
import Card from "../ui/Card";
import { trpc, inferQueryOutput } from "../../utils/trpc";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
  IonLoading,
} from "@ionic/react";
import Notifications from "./Notifications";
import { useState } from "react";
import { notificationsOutline } from "ionicons/icons";

type PostOutput = inferQueryOutput<"post.all">[0];

const FeedCard = (props: PostOutput) => {
  return (
    <Card className="my-4 mx-auto">
      {props.image && (
        <div className="h-32 w-full relative">
          <Image
            className="rounded-t-xl"
            objectFit="cover"
            src={props.image}
            alt=""
            layout="fill"
          />
        </div>
      )}
      <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
        <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">
          {props.title}
        </h2>
        <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400">
          {props.content}
        </p>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 relative">
            <Image
              layout="fill"
              src={props.author.avatar}
              className="rounded-full"
              alt=""
            />
          </div>
          <h3 className="text-gray-500 dark:text-gray-200 m-l-8 text-sm font-medium">
            {props.author.name}
          </h3>
        </div>
      </div>
    </Card>
  );
};

const Feed = () => {
  const posts = trpc.useQuery(["post.all"]);
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Feed</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Feed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Notifications
          open={showNotifications}
          onDidDismiss={() => setShowNotifications(false)}
        />
        {!posts.data ? (
          <IonLoading isOpen={true}></IonLoading>
        ) : (
          posts.data.map((i, index) => <FeedCard {...i} key={index} />)
        )}
      </IonContent>
    </IonPage>
  );
};

export default Feed;
