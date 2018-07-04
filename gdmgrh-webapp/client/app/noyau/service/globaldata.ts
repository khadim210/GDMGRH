import { Injectable } from '@angular/core';

@Injectable()
export class GlobalData {
  //domain: string = "https://localhost:8080";
  listeDiplomes: Array<String> = ['Diplome Civil', 'Diplome Militaire'];
  listeSpecialites: Array<String> = [
	'Achat - Approvisionnement - Logistique',
	'Agro-alimentaire - Agriculture',
	'Artisanat',
	'Assurance - Banque - Bourse',
	'Audiovisuel - Média',
	'Automobile - Aéronautique',
	'Bilan de Compétences - VAE',
	'BTP - Architecture',
	'Bureautique',
	'Collectivités - Secteur Public',
	'Commercial - Marketing - Vente',
	'Communication',
	'Comptabilité - Gestion - Finance - Paie',
	'Conflits - Violences - Malveillance',
	'Culture - Esthétique - Mode',
	'Développement personnel - Coaching',
	'Droit - Fiscalité - Economie',
	'E-learning - formation à distance',
	'Edition - Imprimerie - Presse - Métier du Livre',
	'Environnement',
	'Formation - Enseignement - Pédagogie',
	'Gestion de Projet',
	'Grande Distribution Commerce',
	'Hôtellerie - Restauration - Tourisme',
	'Immobilier',
	'Informatique - Système d\'Information',
	'Interculturel - Expatriation',
	'Langues',
	'Management - Direction',
	'Mathématique - Statistiques',
	'Multimédia - Infographie - Dessin technique',
	'Physique - Chimie - Biologie',
	'Préparation aux concours',
	'Qualité - Organisation',
	'Ressources - Humaines-Personnel',
	'Santé - Social',
	'Sciences humaines et sociales',
	'Secrétariat - Accueil - Assistance',
	'Sécurité - Prévention - Ergonomie',
	'Sport - Loisirs - Animation',
	'Techniques - Industrielles',
	'Télécommunication',
	'Transport',
	'Web/réseaux sociaux',
  ];
}

