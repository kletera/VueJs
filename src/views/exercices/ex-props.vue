<template>
    Exercice sur les Props + vfor + vbind = mode full AUTO
    <!-- props injection automatisé avec v-for et v-bind -->
    <div v-for="ami in lesAmis" :key="ami.id">
        <!-- <OneFriend :friend="ami" /> -->
        <!-- <OneFriend v-for="ami in lesAmis" :key="ami.id" v-bind:unAmiId="ami.id" :unAmiName="ami.name"
            :unAmiPhone="ami.phone" :unAmiMail="ami.email" :unAmiPremium="ami.premium"></OneFriend> -->

        <!-- ✅ BONNE SYNTAXE dans le parent : -->
        <OneFriend v-for="ami in lesAmis" :key="ami.id" :friend="ami" />
    </div>
</template>

<script setup lang="ts">
import OneFriend from '../../components/OneFriend.vue';
import { ref } from 'vue';

interface Friend {
    id: string;
    name: string;
    phone: string;
    email: string;
    premium: boolean;
}
const lesAmis = ref<Friend[]>([
    {
        id: 'lasticot',
        name: 'COCO L ASTICOT',
        phone: '01234 5678 991',
        email: 'coco@lasticot.com',
        premium: false
    },
    {
        id: 'lasticot2',
        name: 'RORO L ASTICOT',
        phone: '01234 5678 991',
        email: 'coco@lasticot.com',
        premium: true
    },
    {
        id: 'kimonoSurUnFrigo',
        name: "Steven Seagal",
        phone: '+338765477',
        email: 'steven@seagal.com',
        premium: true
    },
    {
        id: 'yoyoyo',
        name: "JAROD",
        phone: '+338765477',
        email: 'jAROD@seagal.com',
        premium: true
    },
    {
        id: 'yoyoyo',
        name: "JAROD",
        phone: '+338765477',
        email: 'jAROD@seagal.com',
        premium: true
    },
    {
        id: 'ok',
        name: "JAROD",
        phone: '+338765477',
        email: 'jAROD@seagal.com',
        premium: true
    },
    {
        id: 'GUS',
        name: "GussDX",
        phone: '+338765477',
        email: 'jAROD@seagal.com',
        premium: true
    }
]);

</script>