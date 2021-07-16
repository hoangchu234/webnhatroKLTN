import re
import pandas as pd
import nltk
from nltk.corpus import stopwords
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

def cleanhtml(raw_html):
    cleanr = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext
  
# Tách nội dung thành cách từ kháo keyword
# function for text cleaning 
def clean_text(text):
    # remove backslash-apostrophe 
    text = re.sub("\'", "", text) 
    # remove whitespaces 
    text = ' '.join(text.split()) 
    # remove everything except alphabets 
    # text = re.sub("[^a-zA-Z]"," ",text) 
    # convert text to lowercase 
    text = text.lower()    
    text = re.findall(r'(?i)\b[a-záàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịúùủũụưứừửữựýỳỷỹỵđ]+\b', text)
    return text

# Dùng stopword xóa các từ ảnh hưởng và không liên quan
def freq_words(x, terms = 30): 
  #all_words = ' '.join([text for text in x]) 
  all_words = ' '.join(str(text) for text in x)
  all_words = all_words.split() 
  fdist = nltk.FreqDist(all_words) 
  words_df = pd.DataFrame({'word':list(fdist.keys()), 'counts':list(fdist.values())}) 
  
#   # selecting top 20 most frequent words 
#   d = words_df.nlargest(columns="counts", n = terms) 
  
#   # visualize words and frequencies
#   plt.figure(figsize=(12,15)) 
#   ax = sns.barplot(data=d, x= "counts", y = "word") 
#   ax.set(ylabel = 'Word') 
#   plt.show()

# function to remove stopwords
def remove_stopwords(text):
    # nltk.download('stopwords')
    stop_words = set(stopwords.words('english'))    
    no_stopword_text = [w for w in str(text).split() if not w in stop_words]
    return ' '.join(no_stopword_text)

def count(motels):
    count = CountVectorizer()
    count_matrix = ""
    cosine_sim = ""
    data = []
    for i in range(0, len(motels), 1):
        data.append(motels[i]['Keyword'])
    count_matrix = count.fit_transform(data)
    cosine_sim = cosine_similarity(count_matrix, count_matrix)
    return count_matrix, cosine_sim

def recommend(title, cosine_sim, indices, motels):
    recommended_movies = []
    if len(motels) > 1:
        idx = ""
        for i in range(0, len(indices), 1): 
            if indices[i] == title:
                idx = i
        score_series = pd.Series(cosine_sim[idx]).sort_values(ascending = False)
            
        # getting the indexes of the 10 most similar movies
        top_10_indexes = list(score_series.iloc[1:11].index)

        # populating the list with the titles of the best 10 matching movies
        for i in top_10_indexes:
            recommended_movies.append(motels[i])
    return recommended_movies