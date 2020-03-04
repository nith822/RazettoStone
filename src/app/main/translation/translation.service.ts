import { Injectable } from '@angular/core';
import { Translation } from './translation';
import { Observable, of } from 'rxjs';
import { Text } from './text/text';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

	
let hoveredIndex: number = -1;

@Injectable()
export class TranslationService {
	
	
	constructor(private userService: UserService) {   
	
	}
	
	getTranslations(translationIDs: number[]): Observable<Translation[]> {
		var translations: Translation[] = [];
		translations.push(mockTranslation);
		translations.push(mockTranslation2);
		for(let translation of translations) {
			for(let translatedText of translation.translatedTexts) {
				this.userService.getUsers([translatedText.id]).subscribe((users) => {
					translatedText.user = users[0];
				});
			}
		}
		return of(translations);
	}
	

	getTranslationText(translationID: number, translationTextIDs: number[]): Observable<Text[]> {
		var translationTexts: Text[] = [];
		for(let translation of translations.filter(x => x.originalText.id == translationID)) {	
			for(let translationTextID of translationTextIDs) {
				translationTexts.push(translation.translatedTexts[translationTextID ]);
			}
		}
		return of(translationTexts);
	}
	
}


let originalStrings: string[] = ["「それで天国に行くためにはどうしたらいいの？」",
 "「うーん。里奈っちはそのあたりは専門外なんでよく知らんけど、念仏となえたり、生け贄捧げたり、聖戦したり、まぁいろいろだけど、手っ取り早くおすすめなのは……」",
 "「お金を私に渡す事かなぁ」", 
 "「なんでそうなるの？」", 
 "「聞きたい？」", 
 "「うん……」",  
 "「話せば長い話になるんだけど……いいかなぁ」",  
 "「うん」", 
 "「だから長くなるんだって……」", 
 "「説明するのだるいから、お金だけ渡そうよ……」",  
 "「納得できなければお金あげない」", 
 "「という事は納得すると金を払う。私に総額払うという事ですな昔ね。悠久の昔にね。西方の大陸に、神様の三体目の分身がいたの……」", 
 "「話の始まりが唐突……」", 
 "「いいから黙って聞きなさい。この神様の分身はね。世界の真実を教えるために世界中に布教してまわったのね」", 
 "「そうこうしていると、この神様の化身の元にはたくさんのお弟子さんが集まったんだって……」", 
 "「神様の化身とかうさんくさい……」", 
 "「うん、そうだね。だから弟子の一人が聞いてみたわけよ」", 
 "「天国の門を開くには、我々はどんな行いをすれば良いのでしょうかってね……」", 
 "「そうすると神様の化身はこう言ったんだって……もしそれを得たいのであれば……掟を守りなさい」", 
 "「掟？　どんな掟？」", 
 "「まず殺しちゃなんねぇ。姦淫しちゃなんねぇ。盗んじゃいけねぇ。偽証すんな、お父さんお母さんを敬いなさい……そして隣人を自分のように愛しなさい……」", 
 "「盛りだくさん……」", 
 "「うん、人間が天国の門を開くには一生を使って、この盛りだくさんの掟を守り続けなきゃいけないんだよ……」", 
 "「へぇ……大変なんだ……天国って……」", 
 "「でもね、そのお弟子さんは優秀だったから、そのすべてを守ってたんだって」", 
 "「なら、その人は天国にいけるの？」", 
 "「ううん。ダメだったんだって」", 
 "「なんで？」", 
 "「主は仰いました……もしあなたが完全なる門を開きたいのであれば、街に降りてすべてを売り払い、そして貧しき人々に施しをしなさい」", 
 "「それは、天に富を積むことになります……」", 
 "「富める者が天国の門をくぐるのは駱駝が針の穴を通るよりも難しい……」", 
 "「お弟子さんは悲しそうな顔で神様の分身の元を去ったんだって……」", 
 "「当たり前だ……」", 
 "「でも、天国に行くにはてっとりばやくお金を払うのがいいんだって」", 
 "「全額とは言わないけど、おばちゃん500円ほど融通してほしいんだなぁ……」",];
 
let translatedStrings: string[] = ["「So what should one do in order to get into heaven?」",
"「Hmm, well I'm not a priest or holy person myself so I don't really know. I think it includes chanting to Budhha, offering live sacrifices, participating in holy crusades and so on. 」",
"「But I would say the quickest way is to give me money.」",
"「And why would I do that?」",
"「Do you want to know?」",
"「Yea.」",
"「The explanation is really complex. You still want to know?」",
"「Yes.」",
"「It's going to be reallllly long and tedious.」",
"「It's a pain in the arse to explain, so please just give me money.」",
"「If I can't understand the reason behind this, I'm not handing over any money.」",
"「That means you'll pay if I can convince you right? You'll pay the entire amount right- Long ago, a very long time ago in the West, there were three incarnations of God.」",
"「Can you slow it down a bit?」",
"「Shh, just listen. One of this god's incarnations right? In order to spread the truth of the world, he set out across the world on a missionary trip.」",
"「Apparently, along his journey, this incarnation aquired a lot of disciples.」",
"「This 'God's incarnation' and stuff seems kind of suspicious.」",
"「Well yeah. That's why one of his disiciples asked him a question:」",
"「'In order to open the gates of heaven, what should we be doing?'」",
"「God's incarnation replied thusly, 'If you wish to attain entrance to the promised land, follow the commandments'.」",
"「'Commandments? What kind of commandments?'」",
"「'Firstly, Thou shalt not murder. Thou shalt not commit adultery. Thou shalt not steal. Thou shalt not bear false witness against thy neighbour. Honour thy father and thy mother. And finally, Thou shalt love thy neighbour as thyself.'」",
"「Wow, there's quite a lot.」",
"「Yep. In order for humans to pass through the gate of heaven, one must uphold these commandments for their entire life.」",
"「Seems really difficult to get into heaven.」",
"「But that one disciple was extremely fastidous and he upheld each and every commandment.」",
"「Then, was he able to get into heaven?」",
"「Nope. Apparently not.」",
"「Why?」",
"「The Lord proclaimed thusly, 'If you truly wish to enter heaven, go into the town and sell everything you have. Then distribute your riches to the poor.'",
"「'Then you will be rich in heaven.'」",
"「'It is easier for a camel to go through the eye of a needle than for a rich man to enter the kingdom of God.'」",
"「With a disheartened face, the disiciple then left the pressence of God's incarnation and quit being a disicple.」",
"「Of course he would!」",
"「That's why I said that the quickest way to go to heaven is by giving me money.」",
"「I'm not asking for all of your wallet, but perhaps you can spare lil' ol' me 5 bucks?」"];

let translatedStrings2: string[] = ["「 How can I go to heaven? 」",
 "「 Hmm. Rinachi is not well-known because it's not a specialty, but it can be called a buddha sacrifice, sacrificed, holy wars, etc.」",
 "「I wonder if I will give money to me」",
 "「 Why is that so? 」",
 "「I want to hear?」", 
 "「Yup……」",  
 "「 If you talk, it will be a long story ... Is it okay? 」",
 "「Yup」", 
 "「 So it's going to be long ... 」",
 "「 I'll give you just the money because it's too much explanation ... 」",
 "「 I won't give you money if I'm not satisfied」",
 "「 That means paying me if I'm convinced. It's about paying me the whole time.」",
 "「 The story starts abruptly ... 」",
 "「 Since it's good, listen silently. This alter ego is God. You have spread all over the world to teach the truth of the world. 」",
 "「 That's how many disciples gathered under the incarnation of God ... 」",
 "「 God's incarnation ... 」",
 "「 Yes, that's right, so one of my disciples asked me. 」",
 "「 What should we do to open the gates of heaven ...」 ",
 "「 Then the incarnation of God said, 'If you want to get it ... keep the rules.' 」",
 "「 Rule? What kind of rule? ",
 "「 You must kill first. You must not commit adultery. Don't steal. Don't perjury. Honor your dad and mother .... and love your neighbor like yourself ... 」",
 "「 A lot ... 」",
 "「 Yeah, humans have to keep their plenty of rules, using their entire lives to open the gates of heaven ... 」",
 "「 Huh ... it's hard ... heaven is ... 」",
 "「But, the apprentice was so good that he protected everything. 」",
 "「 Can he go to heaven? 」",
 "「 No, it wasn't. 」",
 "「why?」", 
 "「 The Lord said ... If you want to open the perfect gate, go down to the city and sell everything, and give alms to the poor 」",
 "「 It will accumulate wealth in heaven ... 」",
 "「 It is more difficult for the rich to go through the gates of heaven than for a camel to go through a needle hole ... 」",
 "「 The disciple left God's alter ego with a sad face ... 」",
 "「No wonder……」", 
 "But to get to heaven, it's best to pay the most money.」",
 "「 I wouldn't say it's the full amount, but I want my aunt to have about 500 yen ... 」",];

let comments: string[] = ['hello', 'world'];

let originalText: Text = new Text(originalStrings, 1, null, "Abend, Chapter 2 Scene 1", "Japanese");
let translatedText: Text = new Text(translatedStrings, 111, null, "Chad's translation", "English");
let translatedText2: Text = new Text(translatedStrings2, 222, null, "Google's translation", "Japanese");
let translatedTexts: Text[] = [translatedText, translatedText2];

let mockTranslation: Translation = new Translation(originalText, translatedTexts);

/////
let originalString2: string[] = ["Qu’elle ose regarder mon nez, cette camarde ! (Il lève son épée.) Que dites-vous ?… C’est inutile ?… Je le sais ! Mais on ne se bat pas dans l’espoir du succès ! Non ! non ! c’est bien plus beau lorsque c’est inutile ! – Qu’est-ce que c’est que tous ceux-là ? – Vous êtes mille ? Ah ! je vous reconnais, tous mes vieux ennemis ! Le Mensonge ? (Il frappe de son épée le vide.) Tiens, tiens ! – Ha ! ha ! les Compromis, Les Préjugés, les Lâchetés !… (Il frappe.) Que je pactise ? Jamais, jamais ! – Ah ! te voilà, toi, la Sottise ! – Je sais bien qu’à la fin vous me mettrez à bas ; N’importe : je me bats ! je me bats ! je me bats ! (Il fait des moulinets immenses et s’arrête haletant.) Oui, vous m’arrachez tout, le laurier et la rose ! Arrachez ! Il y a malgré vous quelque chose Que j’emporte, et ce soir, quand j’entrerai chez Dieu, Mon salut balaiera largement le seuil bleu, Quelque chose que sans un pli, sans une tache, J’emporte malgré vous,et c’est…C’est ?…Mon panache."
];
let originalText2: Text = new Text(originalString2, 2, null, "CYRANO DE BERGERAC, Mon Panache", "French");
let translatedStrings3: string[] = ["I see him! He, the noseless one, dares to mock my nose! How insolent! [He raises his sword.] You say it's useless. That I know. But who fights believing that every battle will be a success? I fought for lost causes and fruitless quests! You there! I see you! Thousands of you! All enemies of mine, I know you now! Ah! There's Falsehood! [He strikes the air with his sword.] And Compromise! Prejudice! Treachery! [He strikes.] Will I surrender? Strike an agreement? Never! And there you are, Folly! I know you'll be the one to take me down, at last. Yet I'll fall fighting, fighting still! [He makes passes in the air, and stops, breath- less.] You've stripped me of the laurel and the rose! Of glory and love! Take it all! But there is still one thing I hold against you, and when I enter God's house tonight, I shall wave one thing in salutation, across heaven's blue threshold. For there is one thing I have left, void of smear or stain, and I take it with me despite you. And that is—?My white plume."];
let translatedStrings4: string[] = ["勝つ望みがある時ばかり。戦うのと訳が違うぞ。そうとも……負けると知って戦うのが、遙かに美しいのだ… …… …そうだ貴様らは、俺からすべてを奪おうとする。さあ、取れ、取るがいい！ だがな、貴様達がいくら騒いでも、あの世へ、俺が持って行くものが一つある！神の懐へ入るときにはな、俺はこう挨拶をして、青空の門を広々と掃き清めて、貴様らがなんと言おうと持って行くのだ！ 皺一つ、染み一つつけないままで！それはな、わたしの……心意気だ！"];

let translatedText3: Text = new Text(translatedStrings3, 333, null, "Gutenberg's translation", "English");
let translatedText4: Text = new Text(translatedStrings4, 444, null, "Sca-ji's translation", "Japanese");
let translatedTexts2: Text[] = [translatedText3, translatedText4];

let mockTranslation2: Translation = new Translation(originalText2, translatedTexts2);

let translations: Translation[] = [mockTranslation, mockTranslation2];